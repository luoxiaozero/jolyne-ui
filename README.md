# Jolyne UI

一个 Vue3 的 UI 库

## 支持 React

```tsx
import { useState } from "react"
import { JoButton } from "jolyne-ui/lib/react"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <h1>React</h1>
            <div>
                <JoButton onClick={() => setCount(count => count + 1)} type="success">
                    count is {count}
                </JoButton>
            </div>
        </div>
    )
}

export default App
```

# 感谢

[naive-ui](https://github.com/TuSimple/naive-ui)
