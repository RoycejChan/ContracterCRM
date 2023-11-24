import "./bottomNav.css"

export default function BottomNav() {
    return (
        <div className="bottomNav flex flex-col gap-4 mb-4 mr-3">
            <button className="bg-stone-600 p-3 text-3xl rounded-full">
                🔔
            </button>
            <button className="bg-stone-600 p-3 text-3xl rounded-full">
                📒
            </button>
        </div>
    )
}