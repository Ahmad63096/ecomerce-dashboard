const handleDownload = (objectId, fileType) => {
  const token = localStorage.getItem("authToken");
  const apiUrl = `https://bot.devspandas.com/api/get/export-file/?file_type=${fileType}&object_id=${objectId}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      return response.blob(); // Parse the response as a blob
    })
    .then((blob) => {
      console.log(`${fileType.toUpperCase()} File Blob:`, blob);
      // Optionally, download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${objectId}.${fileType}`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
const appointments = [
  { id: 1, name: "Jonathan", date: "29 September 2024", time: "07:10 PM", email: "rita90@gmail.com", necessity: "Support", status: "Waiting" },
  { id: 2, name: "Natalie", date: "27 February 2024", time: "08:34 PM", email: "ghall@gmail.com", necessity: "Support", status: "Waiting" },
  { id: 3, name: "Michael", date: "26 May 2024", time: "08:37 PM", email: "perrytimothy@hotmail.com", necessity: "Ecommerce", status: "Cancel" },
  { id: 4, name: "Roy", date: "07 June 2024", time: "09:54 PM", email: "ohorton@gmail.com", necessity: "Ecommerce", status: "Cancel" },
  { id: 5, name: "Craig", date: "26 November 2024", time: "11:20 PM", email: "allenalisha@perkins.info", necessity: "Training", status: "Pending" },
  { id: 6, name: "Michael", date: "05 October 2024", time: "07:48 PM", email: "ytaylor@oneill.com", necessity: "Support", status: "Cancel" },
  { id: 7, name: "David", date: "18 December 2024", time: "10:56 AM", email: "scott67@schultz.com", necessity: "Ecommerce", status: "Cancel" },
  { id: 8, name: "Victoria", date: "21 July 2024", time: "12:58 AM", email: "ydavis@king.com", necessity: "Consultation", status: "Success" },
  { id: 9, name: "Elizabeth", date: "06 April 2024", time: "04:10 AM", email: "jesse49@miranda-myers.org", necessity: "Consultation", status: "Waiting" },
  { id: 10, name: "Angela", date: "01 October 2024", time: "04:47 AM", email: "huynhelizabeth@ward.com", necessity: "Support", status: "Waiting" },
  { id: 11, name: "Jennifer", date: "16 November 2024", time: "06:41 AM", email: "leesarah@hotmail.com", necessity: "Support", status: "Success" },
  { id: 12, name: "Jennifer", date: "07 December 2024", time: "03:58 PM", email: "dustin69@mathews.com", necessity: "Support", status: "Cancel" },
  { id: 13, name: "Terry", date: "26 March 2024", time: "12:23 AM", email: "julian27@gmail.com", necessity: "Support", status: "Success" },
  { id: 14, name: "Kathryn", date: "20 January 2024", time: "09:56 AM", email: "davisthomas@gmail.com", necessity: "Ecommerce", status: "Waiting" },
  { id: 15, name: "Benjamin", date: "04 May 2024", time: "04:40 AM", email: "jacquelinebarton@gmail.com", necessity: "Consultation", status: "Pending" },
  { id: 16, name: "Yvonne", date: "13 May 2024", time: "07:06 PM", email: "xgreen@hotmail.com", necessity: "Training", status: "Waiting" },
  { id: 17, name: "Michael", date: "24 April 2024", time: "06:15 AM", email: "laura94@hotmail.com", necessity: "Support", status: "Cancel" },
  { id: 18, name: "John", date: "25 February 2024", time: "04:30 AM", email: "igriffin@yahoo.com", necessity: "Training", status: "Pending" },
  { id: 19, name: "Cynthia", date: "28 August 2024", time: "05:17 PM", email: "jeremy89@rocha.com", necessity: "Ecommerce", status: "Pending" },
  { id: 20, name: "Edwin", date: "20 December 2024", time: "10:50 PM", email: "rblackburn@stone-hill.net", necessity: "Ecommerce", status: "Waiting" }
];
export default handleDownload
export {appointments}