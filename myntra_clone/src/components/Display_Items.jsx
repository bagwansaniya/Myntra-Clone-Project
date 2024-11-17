import { useDispatch, useSelector } from "react-redux";
import { BagAction } from "../store/bagSlice";
import { IoBagAddOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

function Display_Items({ item }) {
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.Bagdata);
  const bagitempresent = bag.indexOf(item.id) >= 0;
  console.log(bagitempresent);
  return (
    <>
      <div className="item-container">
        <img className="item-image" src={item.image} alt="item image" />
        <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
        </div>
        <div className="company-name">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
        </div>
        {bagitempresent ? (
          <button
            className="btn-add-bag btn btn-danger"
            onClick={() => {
              dispatch(BagAction.RemoveitemBag(item.id));
            }}
          >
            Remove
            <AiOutlineDelete />
          </button>
        ) : (
          <button
            className="btn-add-bag"
            onClick={() => {
              dispatch(BagAction.AdditemtoBag(item.id));
            }}
          >
            Add to Bag
            <IoBagAddOutline />
          </button>
        )}
      </div>
    </>
  );
}
export default Display_Items;
