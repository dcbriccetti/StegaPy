from stegapy import create_image, decode_image

message = 'a secret message'
create_image(message, 'original-image.png', 'secret-image.png')
decoded = decode_image('secret-image.png')
print(decoded)
assert decoded == message
