precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

uniform float th;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    float c = texture(texture, vertTexCoord.st + vec2( 0,  0)*texOffset).r;
    float l = texture(texture, vertTexCoord.st + vec2(-1,  0)*texOffset).r;
    float d = texture(texture, vertTexCoord.st + vec2( 0, -1)*texOffset).r;
    float r = texture(texture, vertTexCoord.st + vec2( 0,  1)*texOffset).r;
    float u = texture(texture, vertTexCoord.st + vec2( 1,  0)*texOffset).r;
    float m = min(min(l, d), min(r, u));
    fragColor = (c > 0.48 && m < th) ? vec4(1.) : vec4(vec3(0.), 1.);
}
