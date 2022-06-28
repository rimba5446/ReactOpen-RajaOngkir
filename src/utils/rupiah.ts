export function convertToRupiah(angka: number): string {
  let rupiah = "";
  const angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++) {
    if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
  }

  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}
