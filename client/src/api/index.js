import axios from "axios";

const API = axios.create({baseURL: "http://localhost:4000/api/",});

export const GestPost = async () => await API.get("/posts");
export const CreatePost = async (data) => API.post("/posts", data);
export const GenerateAIImage = async (data) => API.post("/generateImage", data);