import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <BaseTemplate>
      <div className="bg-[#53507c]">{props.children}</div>
    </BaseTemplate>
  );
}
