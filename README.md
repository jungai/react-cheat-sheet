# React Cheat Sheet (ไทย)

## useState

`useState` คือ hook ของ react ที่เอาไว้ใช้ในประกาศ state ของ ตัว component ซึ่งสามารถใส่ค่า default ลงไปได้และ type ยังสามารถ inferred จากตัว default ได้อีก

โดย `useState` จะ return array ออกมาโดยที่ index ที่ 0 จะเป็น value(state), index ที่ 1 จะเป็น setter function ที่เอาไว้เปลี่ยนแปลงค่าของ value

> การประกาศ setter function ควร _prefix_ ด้วย keyword \_set... ตามด้วยชื่อ value

```jsx
const [state, setState] = useState(); // undefined, type => undefined
const [count, setCount] = useState(0); // 0, type => number
```

นอกจากนี้เรากำหนด type ที่เป็น generic type ให้กับ `useState` ได้

```jsx
const [state, setState] = useState<number | undefined>();

interface Person {
    id: 1,
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

- `useState` ค่า value ที่ออกมาจะมีสถานะที่เป็น stale state
