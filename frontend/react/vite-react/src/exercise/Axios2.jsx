import React, { useEffect, useState } from "react";
import axios from "axios";

const Axios2 = () => {
    // STATES
    //GET
    const [data, setData] = useState([]); // stores fetched data
    const [loading, setLoading] = useState(true); // tracks if the data is still loading
    const [error, setError] = useState(null); // handles any error that occurs during the data fetch

    // POST
    const [title, setTitle] = useState(""); // manage title (user input)
    const [body, setBody] = useState(""); // manage body (user input)
    const [responseMessage, setResponseMessage] = useState(""); // response message from the API

    // GET --------------------------------------------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        // Make GET request to fetch data
        // API request is made using axios.get to fetch posts from the URL
        axios
            .get("https://jsonplaceholder.typicode.com//posts")
            .then((response) => {
                setData(response.data); // response is stored in data
                setLoading(false); // loading is set to false when the fetch completes
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>; // if data is still loading, it displays "Loading..."
    if (error) return <div>Error: {error}</div>; // if an error occurs, it displays the error message

    // POST --------------------------------------------------------------------------------------------------------------------------------------------------

    const handleSubmit = (event) => {
        event.preventDefault();

        // new post object is created with the title and body
        const newPost = {
            title,
            body,
        };

        // Make POST request to send data
        // POST request is made using axios.post to send the data to the API
        axios
            .post("https://jsonplaceholder.typicode.com//posts", newPost)
            .then((response) => {
                setResponseMessage("Post created successfully!"); // if successful
            })
            .catch((err) => {
                setResponseMessage("Error creating post"); // if there’s an error
            });
    };

    return (
        <>
        {/*GET*/}
        <div>
            <h1>Posts</h1>
            <ul> {/*renders a list of post titles from the fetched data*/}
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>

        {/*POST*/}
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={title} // ezeket dolgozzuk fol
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Post Body"
                    value={body} // ezeket dolgozzuk fol
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Create Post</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
        </>
    );
};

export default Axios2;