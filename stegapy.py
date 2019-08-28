from math import sqrt, ceil
import numpy as np
from PIL import Image


def bits_provider(message):
    for char in message:
        ascii_value: int = ord(char)
        for power in range(7, -1, -1):
            yield 1 if ascii_value & 2 ** power else 0


def chars_provider(bits):
    byte = 0
    for i, bit in enumerate(bits):
        power = 7 - i % 8
        if bit:
            byte |= 2 ** power
        if power == 0:
            char: str = chr(byte)
            if not char.isprintable() and char != '\n':
                return

            yield char
            byte = 0


def create_image(message, filename):
    bits_in_msg = len(message) * 8
    image_width = ceil(sqrt(bits_in_msg))
    pixels = np.zeros([image_width, image_width, 3], dtype=np.uint8)
    pixels[:, :] = [0, 255, 0]
    for i, bit in enumerate(bits_provider(message)):
        row = i // image_width
        col = i % image_width
        red_value = pixels[row, col][0]
        pixels[row, col][0] = red_value & ~1 | bit
    img = Image.fromarray(pixels)
    img.save(filename)
    img.close()


def decode_image(filename):
    img = Image.open(filename)
    result = ''.join(chars_provider(img.getdata(band=0)))
    img.close()
    return result
