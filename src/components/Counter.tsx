import { createSignal, createEffect } from "solid-js";
import "./Counter.css";
import { makePersisted } from '@solid-primitives/storage';
import { createStore } from "solid-js/store";

export type AppSettings = {
  lastCounter: number;
}

const defaultSettings: AppSettings = Object.freeze({ lastCounter: 0 });

const [settingsStore, setSettings] = makePersisted(
  createStore<AppSettings>(defaultSettings, { name: 'example-settings' }),
);


export default function Counter() {
  const [count, setCount] = createSignal(settingsStore.lastCounter);

  createEffect(() => {
    setSettings('lastCounter', count());
  });

  return (
    <button class="increment" onClick={() => setCount(count() + 1)} type="button">
      Clicks: {count()}
    </button>
  );
}
