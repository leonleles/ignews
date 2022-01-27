import { useEffect, useState } from "react";

export function Async() {
  const [visibleButton, setVisibleButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisibleButton(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello word</div>
      {visibleButton && <button>Button</button>}
    </div>
  );
}
