import { useSelector } from "react-redux";
import BagItemContainer from "../components/BagItemContainer";
import BagSummary from "../components/BagSummary";

const Bag = () => {
  const bagitem = useSelector((store) => store.Bagdata);
  const itemdata = useSelector((store) => store.items);
  const finallistitem = itemdata.filter((item) => {
    const presentitem = bagitem.indexOf(item.id);
    return presentitem >= 0;
  });
  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {finallistitem.map((item,index) => {
              return <BagItemContainer key={index} item={item} />;
            })}
          </div>
          <BagSummary />
        </div>
      </main>
    </>
  );
};
export default Bag;
