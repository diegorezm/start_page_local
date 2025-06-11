import { Bolt, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useOpenConfigSidebar } from "src/store/use-open-config-sidebar";

export function Navbar() {
  const { onOpen } = useOpenConfigSidebar()
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between">
      <div></div>
      <div className="flex gap-2 items-center justify-center">
        <Clock />
        <span className="text-lg">
          {clock.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </span>
      </div>
      <div>
        <button className="hover:cursor-pointer" onClick={onOpen}>
          <Bolt />
        </button>
      </div>
    </nav>
  );
}
