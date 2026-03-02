import { LoginLeftPanel } from "./login-left-panel";
import { LoginRightPanel } from "./login-right-panel";

export function LoginLayout() {
  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <LoginLeftPanel />
      <LoginRightPanel />
    </main>
  );
}