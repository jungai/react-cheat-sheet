# 🪜 สถานะ : ปรับปรุง

# React Cheat Sheet

## Functional Component

เป็น function ที่ return ตัว jsx ออกมา​ซึ่งสามารถมี state เป็นของตัวเองได้(react version >= 16.8)

```jsx
function App() {
  return <div>hello react</div>;
}

const App = () => <div>hello react</div>;
```

## useState

`useState` คือ hook ของ react ที่เอาไว้ใช้ในประกาศ state ของ ตัว component ซึ่งสามารถใส่ค่า default ลงไปได้และ type ยังสามารถ inferred จากตัว default ได้อีก

โดย `useState` จะ return array ออกมาโดยที่ index ที่ 0 จะเป็น value(state), index ที่ 1 จะเป็น setter function ที่เอาไว้เปลี่ยนแปลงค่าของ value

> การประกาศ setter function ควร _prefix_ ด้วย keyword \_set... ตามด้วยชื่อ value

```jsx
const [state, setState] = useState(); // undefined, type => undefined
const [count, setCount] = useState(0); // 0, type => number
```

นอกจากนี้เรากำหนด type ที่เป็น generic type ให้กับ `useState` ได้

```tsx
const [state, setState] = useState<number | undefined>();

interface Person {
  id: 1;
  name: string;
}

const [person, setPerson] = useState<Person>({ id: 1, name: "junior" });
```

เวลาที่จะเปลี่ยนค่า state เราจะเปลี่ยนด้วย setter function

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(2);
setCount("2"); // error type string can't assign to type number
```

นอกจากนี้เรายังสามารถใส่ `callback function` ใน setter function ได้โดยเราจะได้ค่าก่อนหน้ามาใช้

```jsx
const [count, setCount] = useState(0);

setCount((prev) => prev); // 0
setCount((prev) => prev + 1); // 1
```

ข้อควรระวัง

- `useState` ค่า value ที่ออกมาจะมีสถานะที่เป็น `stale state`
- ทุกทั้งที่ call setter function จะทำให้ component re-render

refs

- [stale state](https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/)

## useEffect

`useEffect` คือ hook ของ react ที่รวบรวม 3 lifecycle ของ react เข้าด้วยกันคือ `mounted`, `updated`, `unmounted` โดย `useEffect` เป็น function ที่รับ parameter 2 ตัว คือ 1. callback function 2. dependencies array `useEffect(() => {}, [])`

```jsx
useEffect(() => {
  // mounted + updated do here

  return () => {
    // unmounted do here
  };
});
```

`useEffect` จะถูก call ตามกรณี

1. จะถูก call ครั้งแรกเมื่อ component นั้น `mounted`
2. จะถูก call ใหม่ถ้า component นั้นมีการ `updated`
3. จะถูก call ถ้าเกิด component นั้นมีการ `unmounted`

> `unmounted` จะถูก call ถ้าเกิดมีการ call useEffect ครั้งใหม่

วิธีการใช้

ต้องการให้ `useEffect` ทำงานครั้งแรกตอน component `mounted` เท่านั้นเราจะเป็นต้องใส่ empty dependencies array

```jsx
useEffect(() => {
  console.log("mounted only");
}, []);
```

> ข้อควรระวัง ถ้าเราไม่ใส่ `[]` จะทำให้ `useEffect` ถูก call ทุกครั้งเมื่อมีการ update ตามข้อมูลข้างบน

### Multi useEffect

ในหนึ่ง component สามารถมีได้หลาย useEffect และมันจะทำงานตาม order

```jsx
useEffect(() => {
  console.log("2");
}, []);

useEffect(() => {
  console.log("1");
}, []);

useEffect(() => {
  console.log("3");
}, []);
```

output จะได้

```log
 2
 1
 3
```

### การใช้งาน dependencies array

เราสามารถใช้ `useEffect` ในการ watched ค่า state ที่เปลี่ยนแปลงโดยใส่ค่าลงไปใน dependencies array

```tsx
type MyLove = "iu" | "rose" | "secret";
const [myLove, setMyLove] = useState<MyLove>("iu");
const [count, setCount] = useState(0);

useEffect(() => {
  // call on first mounted and when count is changed
  console.log(`count => ${count}`);
}, [count]);

useEffect(() => {
  // call on first mounted and when myLove is changed
  console.log(`myLove => ${myLove} ❤️`);
}, [myLove]);

useEffect(() => {
  // call on first mounted and when ever any state is changed
  console.log(`both => ${count} ${myLove}`);
});

useEffect(() => {
  // call only once when mounted
  console.log(`no1 is ${myLove}`);
}, []);

setCount((prev) => prev + 1);
setMyLove("secret");
```

output

```log
count => 0
myLove => iu ❤️
both => 0 iu
no1 is iu
count => 1
both => 1 iu
myLove => secret
both => 1 secret
```

> tips เราสามารถใส่ ค่า dependencies array ได้มากกว่า 1 ค่า e.g. `[myLove, count]`
