const date1 = new Date("2025-01-06");
const date2 = new Date("2025-01-05");

// Comparaison
if (date1.getTime() === date2.getTime()) {
  console.log("Les deux dates sont identiques.");
} else if (date1.getTime() < date2.getTime()) {
  console.log("La première date est antérieure à la deuxième.");
} else {
  console.log("La première date est postérieure à la deuxième.");
}
