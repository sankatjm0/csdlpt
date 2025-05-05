"use client"

export default function ErrorDisplay({ error, onRetry }) {
    return (
        <div className="error-container">
            <div className="error">
                <h2>Lỗi kết nối</h2>
                <p>{error}</p>
                <div className="error-help">
                    <p>Vui lòng kiểm tra:</p>
                    <ul>
                        <li>Máy chủ API có đang chạy không (port 5001)</li>
                        <li>Kết nối mạng của bạn</li>
                        <li>Cấu hình API_URL trong ứng dụng</li>
                    </ul>
                </div>
            </div>
            <button className="retry-button" onClick={onRetry}>
                Thử lại
            </button>
        </div>
    )
}
