import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let char = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (specialCharAllowed) string += "!@#$%^&*()_+";
    if (numberAllowed) string += "0123456789";

    for (let i = 0; i < length; i++) {
      char += string[Math.floor(Math.random() * string.length)];
    }

    setPassword(char);
  }, [length, specialCharAllowed, numberAllowed, setPassword]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialCharAllowed, generatePassword]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-black bg-slate-50">
        <h1 className="text-3xl font-bold font-serif text-center my-6">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full outline-none py-1 px-3 text-lg text-center"
            placeholder="Generated Password"
            ref={passwordRef}
          />
          <button className="text-sm font-mono font-semibold bg-slate-200 px-3 text-center hover:bg-slate-300 active:bg-slate-400 transition-all duration-300 ease-in-out"
          onClick={copyPassword}>
            Copy
          </button>
        </div>
        <div className="flex flex-wrap justify-between text-sm gap-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>
              Length: <strong>{length}</strong>
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={specialCharAllowed}
              onChange={(e) => setSpecialCharAllowed(e.target.checked)}
            />
            <label> Special Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
            />
            <label> Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
