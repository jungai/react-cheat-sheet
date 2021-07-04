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

## Jsx

`jsx` คือ syntax ที่เราสามารถเขียน `html` ไปในตัว javascript ได้

```jsx
const something = <h1>hello</h1>;
const something2 = () => <h1>hello</h1>;
```

โดยที่ใน html เราสามารถใช้ javascript เข้าไปได้โดยใช้ `brackets` หรือก็คือ `{}`

1. display variable

```jsx
const name = "Junior";

const Title = <h1> Hello {name}</h1>;

const App = () => <div>{Title}</div>;
```

2. conditional rendering

```jsx
const alwaysTrue = true;

const Title = <div>{alwaysTrue ? <h1>IU ❤️</h1> : <h1>Junior</h1>}</div>;

const App = () => {
  return (
    <div>
      {Title}
      { alwaysTrue ? 'can display string' : null }
      { alwaysTrue && <p>display this</p>}
    <div>
  )
}
```

3. looping หรือ list

```jsx
const myList = ["iu", "rose", "twice"];

const App = () => (
  <div>
    {myList.map((name, index) => (
      // จำเป็นต้องใส่ key
      <p key={`${index}${name}`}>{name}</p>
    ))}
  </div>
);
```

> การ loop จำเป็นต้องใส่ attribute `key` (เพื่อเป็นการบอกว่า element อันนัั้นมี unique key อะไร)

## Style in react

1. css in js

```jsx
<div style={{ display: "flex", backgroundColor: "tomato" }}>
  <h1 style={{ color: "white" }}>Junior</h1>
</div>
```

> `css in js` จะเขียนที่อยู่ในรูปแบบ `object` ซึ่ง keyจะเป็น `camelCase` แล้ว value เป็น string

2. css file

```jsx
// style.css
.title {
  color: tomato;
}

// index.jsx
import './style.css'

const App = () => (
  <div>
    <h1 className="title">Junior</h1>
  </div>
```

> ใน html เราจะใช้ `class` ในการใช้ css แต่ใน react `class` เป็น `reserved word` เราจะใช้เป็น `className` แทน

## useState

`useState` คือ hook ของ react ที่เอาไว้ประกาศ state ของ ตัว component ซึ่งสามารถใส่ค่า default ลงไปได้และ type ยังสามารถ inferred จากตัว default ได้อีก

โดย `useState` จะ return array ออกมาโดยที่ index ที่ 0 จะเป็น value(state), index ที่ 1 จะเป็น setter function ที่เอาไว้เปลี่ยนแปลงค่าของ value

> การประกาศ setter function ควร _prefix_ ด้วย keyword `set` ตามด้วยชื่อ value

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

```tsx
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(2);
setCount("2"); // tsx => error type string can't assign to type number
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
myLove => secret ❤️
both => 1 secret
```

> tips เราสามารถใส่ ค่า dependencies array ได้มากกว่า 1 ค่า e.g. `[myLove, count]`

## Event

การ handle event ใน react เราจะใช้ prefix `on` e.g. `onClick`, `onChange`, `onKeyup` ใน html tag

```jsx
const handleOnKeyUp = () => {};

<input value="" onChange={() => {}} onKeyup={handleOnKeyUp}/>

<button
  onClick={() => {
    console.log("is click");
  }}
>
  click me
</button>
```

refs

- [handle event](https://reactjs.org/docs/handling-events.html)
- [events](https://reactjs.org/docs/events.html)
