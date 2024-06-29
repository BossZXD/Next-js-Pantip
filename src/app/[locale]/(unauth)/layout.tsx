import { BaseTemplate } from "@/templates/BaseTemplate";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <BaseTemplate>
      <div className=" text-xl">{props.children}</div>
    </BaseTemplate>
  );
}
