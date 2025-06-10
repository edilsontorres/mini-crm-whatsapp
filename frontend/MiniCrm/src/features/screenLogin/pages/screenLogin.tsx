export const Login = () => {
    return (
        <>

            <div className="flex h-screen bg-gray-900 text-white min-h-screen justify-center items-center">
                <div className="flex min-h-screen max-w-2/4">
                    <div className="flex-1 flex items-center justify-center">
                        <img className="h-2/4" src="../../../../bg-login.jpg" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex flex-col bg-gray-700 w-full h-2/4 justify-center items-center">
                            <div className="flex flex-col bg-white rounded-2xl h-10/12 w-3/4 items-center p-2">
                                <div className="mb-5 mt-7 text-black ">
                                    <h1 className="text-2xl">Entre</h1>
                                </div>
                                <div className="flex justify-center items-center  p-1 w-full">
                                    <form className="flex flex-col text-black w-full">
                                        <div className="mb-3">
                                            <label>Email</label><br />
                                            <input type="email" className="h-9 p-1 pl-2.5 border-gray-700 border focus:outline-none w-full rounded-md"/>
                                        </div>
                                        <div className="mb-10">
                                            <label>Senha</label><br />
                                            <input type="password" className="h-9 p-1 pl-2.5 border-gray-700 border focus:outline-none w-full rounded-md"/>
                                        </div>
                                        <div>
                                            <button className="bg-blue-600 p-1 rounded-md w-20 text-white cursor-pointer">
                                                Entrar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}