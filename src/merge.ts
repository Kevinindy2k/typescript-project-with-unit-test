// ฟังก์ชันสำหรับรวม 3 array ที่เรียงลำดับอยู่แล้ว ให้กลายเป็น array เดียวที่เรียงจากน้อยไปมาก
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  // เช็คกรณีที่ไม่มี input
  if (!collection_1 && !collection_2 && !collection_3) {
    return [];
  }

  const arr1 = collection_1 || [];
  const arr2 = collection_2 || [];
  const arr3 = collection_3 || [];

  // collection_1 เรียงจากมากไปน้อย เลยต้องกลับด้านก่อน
  const reversedArr1: number[] = [];
  for (let i = arr1.length - 1; i >= 0; i--) {
    reversedArr1.push(arr1[i]);
  }

  // ตอนนี้มี array 3 ตัวที่เรียงจากน้อยไปมากแล้ว ก็เอามารวมกัน
  const result: number[] = [];
  let i = 0;
  let j = 0;
  let k = 0;

  // วนลูปเปรียบเทียบค่าจาก 3 array พร้อมกัน เอาตัวที่น้อยสุดใส่ผลลัพธ์ก่อน
  while (i < reversedArr1.length && j < arr2.length && k < arr3.length) {
    const val1 = reversedArr1[i];
    const val2 = arr2[j];
    const val3 = arr3[k];

    if (val1 <= val2 && val1 <= val3) {
      result.push(val1);
      i++;
    } else if (val2 <= val1 && val2 <= val3) {
      result.push(val2);
      j++;
    } else {
      result.push(val3);
      k++;
    }
  }

  // เอาที่เหลือจาก 2 array มารวมกัน
  while (i < reversedArr1.length && j < arr2.length) {
    if (reversedArr1[i] <= arr2[j]) {
      result.push(reversedArr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < reversedArr1.length && k < arr3.length) {
    if (reversedArr1[i] <= arr3[k]) {
      result.push(reversedArr1[i]);
      i++;
    } else {
      result.push(arr3[k]);
      k++;
    }
  }

  while (j < arr2.length && k < arr3.length) {
    if (arr2[j] <= arr3[k]) {
      result.push(arr2[j]);
      j++;
    } else {
      result.push(arr3[k]);
      k++;
    }
  }

  // ใส่ตัวที่เหลือทั้งหมดเข้าไป
  while (i < reversedArr1.length) {
    result.push(reversedArr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  while (k < arr3.length) {
    result.push(arr3[k]);
    k++;
  }

  return result;
}
