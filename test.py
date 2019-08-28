from stegapy import create_image, decode_image

message = 'The eagle flies at dawn'
create_image(message, 'image.png')
assert decode_image('image.png') == message
