import Categories from "../components/Categories";

const CategoriesPage = () => {
  return (
    <div className="min-h-[70vh] py-10">
      {/* Reusing the beautiful component we built for the home page! */}
      <Categories />
    </div>
  );
};

export default CategoriesPage;