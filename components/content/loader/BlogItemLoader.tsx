import Link from "next/link"

export const BlogItemLoader = () => {
    return<>
    <section className="flex flex-col justify-center bg-gray-100 px-3 py-5 rounded mt-5" style={{
        maxWidth:"300px"
    }}>
        <section className="flex justify-between items-center">
        <h1 className="text-lg font-bold">{'....'.repeat(10)}</h1>
        <span
        className="w-8 h-8 p-2 bg-blue-300 object-cover" style={{
            borderRadius:"50%"
        }}
        ></span>
        </section>
        <p className="text-xs my-2">{'....'.repeat(10)}</p>
        <section>
        <button className="text-sm bg-green-300 px-2 py-1 rounded mt-2">
            .......
        </button>
        </section>
    </section>
    </>
}