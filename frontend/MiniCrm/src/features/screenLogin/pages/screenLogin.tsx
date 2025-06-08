export const Login = () => {
    return (
        <>

            <div className="flex h-screen bg-gray-900 text-white min-h-screen justify-center items-center">
                <div className="flex min-h-screen max-w-2/4">
                    <div className="flex-1 flex items-center justify-center w-3/4 ">
                        <img className="h-2/4" src="../../../../bg-login.jpg" />
                    </div>
                    <div className="flex-1 flex items-center justify-center w-3/4">
                        <div className="flex flex-col bg-gray-700 w-full h-2/4">
                            <div>Login</div>
                            <div>
                                <form className="flex flex-col">
                                    <label>
                                        Nome:
                                        <input />
                                    </label>
                                    <label>
                                        Senha:
                                        <input />
                                    </label>
                                    <button>
                                        Login
                                    </button>
                                </form>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}