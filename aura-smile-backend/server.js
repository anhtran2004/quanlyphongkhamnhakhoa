require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Tăng giới hạn dung lượng tải lên 10MB để gửi ảnh không bị lỗi
app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, image } = req.body;

        if (!message && !image) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tin nhắn hoặc hình ảnh.' });
        }

        // Chuẩn bị dữ liệu gửi cho Gemini
        let contents = [];
        
        // Nếu người dùng có nhập chữ
        if (message) {
            contents.push(message);
        }
        
        // Nếu người dùng có đính kèm ảnh
        if (image) {
            contents.push({
                inlineData: {
                    data: image.base64,
                    mimeType: image.mimeType
                }
            });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Flash model hỗ trợ phân tích ảnh rất nhanh
            contents: contents,
            config: {
                systemInstruction: "Bạn là chuyên gia nha khoa AI của Aura Smile. Bạn có khả năng phân tích hình ảnh răng miệng khách hàng gửi đến. Hãy chỉ ra các vấn đề tiềm ẩn (ví dụ: sâu răng, mảng bám, răng mọc lệch, viêm lợi...) một cách khách quan dựa trên ảnh. Sau đó, khuyên họ đặt lịch hẹn để bác sĩ khám trực tiếp. Luôn giữ thái độ chuyên nghiệp, đồng cảm và lịch sự."
            }
        });

        res.json({ reply: response.text });

    } catch (error) {
        console.error('Lỗi khi gọi Gemini API:', error);
        res.status(500).json({ 
            reply: '⚠️ Xin lỗi, hệ thống AI đang bận xử lý ảnh. Bạn vui lòng thử lại sau nhé!' 
        });
    }
});

app.listen(port, () => {
    console.log(`Backend server đang chạy tại http://localhost:${port}`);
});