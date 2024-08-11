interface TitleProps {
  icon: JSX.Element;
  title: string;
}

const Title = ({ icon, title }: TitleProps) => {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-nowrap text-lg font-semibold text-gray-700 md:text-wrap md:text-xl">
      {icon}
      {title}
    </h3>
  );
};

export default Title;
