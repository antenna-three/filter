uniform sampler2D texture;

uniform float gamma;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    fragColor = pow(texture(texture, vertTexCoord.st), vec4(gamma));
}
