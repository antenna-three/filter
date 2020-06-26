uniform sampler2D texture;

uniform float tone;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    vec4 texColor = texture(texture, vertTexCoord.st);
    vec3 outColor = floor(texColor.rgb * tone) / (tone - 1.);
    fragColor = vec4(outColor, 1.);
}
