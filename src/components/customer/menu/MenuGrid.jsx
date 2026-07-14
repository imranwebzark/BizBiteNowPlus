const MenuGrid = ({
  children,
  columns = "auto",
  className = "",
}) => {
  const gridColumns = {
    auto: `
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      2xl:grid-cols-4
    `,

    two: `
      grid-cols-2
    `,

    three: `
      grid-cols-3
    `,

    four: `
      grid-cols-4
    `,
  };

  return (
    <section
      className={`
        grid
        gap-5

        ${gridColumns[columns] || gridColumns.auto}

        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default MenuGrid;