from ultralytics import YOLO
import sys

def predict(image_path):
    model = YOLO("./src/image/model/best.pt")
    result = model.predict(source=image_path)
    print(result[0].summary(normalize=False, decimals=5))

def main():
    # Lấy danh sách các tham số dòng lệnh, bắt đầu từ index 1 (index 0 là tên của script)
    args = sys.argv[1:]

    # Xử lý và sử dụng các tham số ở đây
    predict(args[0])

if __name__ == "__main__":
    main()