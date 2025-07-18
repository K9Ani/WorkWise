// utils/uploadToCloudinary.js
export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "workwise");          // ⬅️ your unsigned preset
  data.append("cloud_name", "dpgondtnu");      // ⬅️ your cloud name

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dpgondtnu/image/upload",
    { method: "POST", body: data }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const json = await res.json();
  return json.secure_url; // hosted image URL
};
