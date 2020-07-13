//test page to upload image

import React from 'react';

export default class UploadImage extends React.Component {
    constructor(props) {
        super(props);
    }

    Post (e) {
            e.preventDefault()
            const file = document.getElementById('inputGroupFile01').files
            const formData = new FormData()

            formData.append('img', file[0])
            console.log(formData, "and", formData.append('img', file[0]))
            fetch('http://localhost:3000/images/upload', {
                method: 'POST',
                body: formData,
            }).then(r => {
                console.log(r)
            })

            document
                .getElementById("img")
                .setAttribute("src", `http://localhost:3000/upload/${file[0].name}`);

            console.log(file[0])
            console.log("send to backend")
    };

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Image Uplaoder</h1>
                    <p className="lead">
                        This is a simple application to upload and retrieve images from a database
                    </p>
                    <hr className="my-4"/>
                </div>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                        />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose file
                        </label>
                    </div>
                </div>
                <button onClick={this.Post} type="button" className="btn btn-primary">
                    Upload
                </button>
                <img
                    id="img"
                    style={{
                        display: "block"
                    }}
                ></img>

                <h1>ALTERNATIVE METHOD</h1>
                <form className="mt-4"
                      action="http://localhost:3000/images/upload"
                      method="POST"
                      encType="multipart/form-data"
                >
                    <div className="form-group">
                        <input
                            type="file"
                            name="file"
                            id="input-files"
                            className="form-control-file border"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        )
    }
}