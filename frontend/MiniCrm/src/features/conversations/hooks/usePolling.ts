import { useEffect } from "react"

export const usePolling = (calback: () => void, interval = 500)  => {

    useEffect(() => {

        const id = setInterval(calback, interval);
        return () => clearInterval(id);

    }, [calback, interval]);

}