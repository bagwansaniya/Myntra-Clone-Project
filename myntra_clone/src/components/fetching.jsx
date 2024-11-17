import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { itemAction } from "../store/itemslice";
import { FetchdataAction } from "../store/fetchingdataslice";

function Fetching() {
  const fetchstatus = useSelector((store) => store.Fetchdata);
  const dispatch = useDispatch();
  console.log(fetchstatus);
  useEffect(() => {
    if (fetchstatus.fetcheddata) return;

    dispatch(FetchdataAction.fetchdoneincompleted());

    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        dispatch(FetchdataAction.markdone());
        dispatch(FetchdataAction.fetchdonecompleted());
        dispatch(itemAction.addinitialitem(items[0]));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchstatus]); // Update dependency here

  return <></>;
}
export default Fetching;
