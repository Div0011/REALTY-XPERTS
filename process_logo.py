from PIL import Image
import os

source_path = r"C:/Users/divya/.gemini/antigravity/brain/0dca0508-817e-4fe0-976a-5c233ae38a0c/uploaded_image_1769089049895.png"
dest_path = r"c:\Users\divya\.vscode\realityexpert\images\logo_final.png"

try:
    img = Image.open(source_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Change all white (also shades of whites)
        # to transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    
    img.putdata(newData)
    
    # Save as existing logo_final.png to overwrite
    img.save(dest_path, "PNG")
    print(f"Successfully processed and saved to {dest_path}")
    
except Exception as e:
    print(f"Error: {e}")
