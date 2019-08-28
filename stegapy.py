from math import sqrt, ceil
from random import randint
import numpy as np
from PIL import Image


def bits_provider(message):
    for char in message:
        ascii_value: int = ord(char)
        for bit_position in range(7, -1, -1):
            yield 1 if ascii_value & (1 << bit_position) else 0


def chars_provider(pixel_red_values):
    ascii_value = 0
    for i, pixel_red_value in enumerate(pixel_red_values):
        ascii_value_bit_position = 7 - i % 8
        if pixel_red_value & 1:
            ascii_value |= 1 << ascii_value_bit_position
        if ascii_value_bit_position == 0:
            char: str = chr(ascii_value)
            if not char.isprintable() and char != '\n':
                return

            yield char
            ascii_value = 0


def create_image(message: str, filename: str):
    bits_in_msg: int = len(message) * 8
    image_width: int = ceil(sqrt(bits_in_msg))
    pixels = np.random.randint(0, 254, (image_width, image_width, 3), dtype=np.uint8)
    for i, bit in enumerate(bits_provider(message)):
        row = i // image_width
        col = i % image_width
        pixels[row, col, 0] = pixels[row, col, 0] & ~1 | bit
    img = Image.fromarray(pixels)
    img.save(filename)
    img.close()


def decode_image(filename: str) -> str:
    img = Image.open(filename)
    result = ''.join(chars_provider(img.getdata(band=0)))
    img.close()
    return result
