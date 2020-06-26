uniform sampler2D texture;

uniform bool linear;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    vec4 texColor = texture(texture, vertTexCoord.st);
    vec3 redFilter = vec3(1., -1.5, -0.3);
    float r = dot(redFilter, texColor.rgb);
    vec3 weight = vec3(0.299, 0.587, 0.114);
    float v = dot(weight, texColor.rgb);
    fragColor = mix(vec4(v, v, v, 1.), texColor + vec4(0.2, 0, 0, 1), step(0, r));
}
