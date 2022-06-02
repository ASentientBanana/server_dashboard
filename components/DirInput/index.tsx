import { useRef } from "react";



const DirInput = () => {
    const dirRef = useRef(null);

    return (
        <div>
            <input
                onChange={(e) => {

                }}
                type="file"
                directory=""
                webkitdirectory=""
                className="form-control"
                ref={dirRef}
            />

        </div>
    )
}
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        directory?: string;        // remember to make these attributes optional....
        webkitdirectory?: string;
    }
}

export default DirInput;
