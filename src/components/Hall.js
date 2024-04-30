// import { useState } from "react";
// import { projectFirestore } from "../firebase/config";
// import { LuArmchair } from "react-icons/lu";

// import classes from "./Hall.module.css";

// function Hall({ movieProjection }) {
//   const [numOfSeats, setNumOfSeats] = useState(2);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const hallId = movieProjection
//     ? movieProjection.name.split(" ").join("").toLowerCase()
//     : "";

//   console.log(movieProjection ? hallId : "");

//   function handleSeatClicked(rowIndex, seatIndex) {
//     let seat = movieProjection.rows[rowIndex].seats[seatIndex];
//     if (!seat.reserve) {
//       setShowErrorMessage(false);
//       setSelectedSeats([]);
//       let tempSelectedSeats = [];
//       if (
//         seatIndex + numOfSeats <=
//         movieProjection.rows[rowIndex].seats.length
//       ) {
//         for (let i = 0; i < numOfSeats; i++) {
//           if (!movieProjection.rows[rowIndex].seats[seatIndex + i].reserved) {
//             tempSelectedSeats.push([rowIndex, seatIndex + i]);
//           } else {
//             tempSelectedSeats = [];
//             setShowErrorMessage(true);
//             break;
//           }
//         }
//         setSelectedSeats(tempSelectedSeats);
//       } else {
//         tempSelectedSeats = [];
//         setShowErrorMessage(true);
//       }
//     }

//     console.log(showErrorMessage);
//   }

//   function checkSeatAvailability(row, seat) {
//     let flag = selectedSeats.some((item) => {
//       return item[0] === row && item[1] === seat;
//     });
//     return flag;
//   }

//   async function handleReserve() {
//     let fetchedHall;
//     try {
//       await projectFirestore
//         .collection("halls")
//         .doc(hallId)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             fetchedHall = doc.data();
//           } else {
//             console.log("Could not find that movie");
//           }
//         });
//     } catch (err) {
//       console.log(err);
//     }
//     selectedSeats.forEach((tmp) => {
//       const row = tmp[0];
//       const seat = tmp[1];
//       fetchedHall.rows[row].seats[seat].reserved = true;
//     });

//     try {
//       await projectFirestore
//         .collection("halls")
//         .doc(hallId)
//         .update({ hall: fetchedHall });
//     } catch (err) {
//       console.log(err);
//     }
//     window.location.reload();
//   }

//   return (
//     <>
//       {movieProjection && (
//         <div>
//           <div className={classes.inputSeats}>
//             <div className={classes.labelNumOfSeats}>Number of seats: </div>
//             <div className={classes.numOfSeats}>
//               {[...Array(6)].map((_, index) => (
//                 <LuArmchair
//                   key={index}
//                   className={
//                     numOfSeats >= index + 1 ? classes.selectedSeat : ""
//                   }
//                   onClick={() => setNumOfSeats(index + 1)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className={classes.hallArea}>
//             <h5>Select the first wanted seat</h5>
//             {movieProjection &&
//               movieProjection.rows.map((row, rowIndex) => (
//                 <div
//                   key={rowIndex}
//                   style={{ margin: "1rem", padding: "0.5rem" }}
//                 >
//                   Row {row.row}:
//                   {row.seats.map((seat, seatIndex) => (
//                     <span
//                       key={seatIndex}
//                       style={{
//                         backgroundColor: seat.reserved ? "gray" : "lightgray",
//                         padding: "0.5rem",
//                         margin: "0.25rem",
//                         fontSize: "1.5rem",
//                       }}
//                       className={
//                         checkSeatAvailability(rowIndex, seatIndex)
//                           ? classes.seatReserving
//                           : ""
//                       }
//                       onClick={() => handleSeatClicked(rowIndex, seatIndex)}
//                     >
//                       <LuArmchair className={classes.singleChair} />
//                     </span>
//                   ))}
//                 </div>
//               ))}
//           </div>
//           {showErrorMessage && <h5>Select available seats</h5>}
//           <button onClick={handleReserve}>Reserve</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default Hall;
