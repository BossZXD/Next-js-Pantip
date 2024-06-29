import Header from "@/components/Header";
const BaseTemplate = (props: { children: React.ReactNode }) => {
  return (
    <div className="max-w-full text-gray-700 antialiased">
      <div className="mx-max mx-0">
        <Header />
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export { BaseTemplate };
