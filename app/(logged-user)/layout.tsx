import LoggedUserLayoutUI from "@/components/logged-user-layout-ui";
import HandleRedirectLogin from "@/middleware/handle-redirect-login.middleware";
import MustAuth from "@/middleware/must-auth.middleware";

export default function LoggedUserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HandleRedirectLogin>
      <MustAuth>
        <LoggedUserLayoutUI>{children}</LoggedUserLayoutUI>
      </MustAuth>
    </HandleRedirectLogin>
  );
}
