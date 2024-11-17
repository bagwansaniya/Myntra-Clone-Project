import { useSelector } from "react-redux";
import Display_Items from "../components/Display_Items";

function HomeItems() {
  const item = useSelector((store) => store.items);
  console.log(item);
  return (
    <>
      <main>
        <div className="items-container">
          {item.map((product) => {
            return <Display_Items key={product.id} item={product} />;
          })}
        </div>
      </main>
    </>
  );
}
export default HomeItems;
