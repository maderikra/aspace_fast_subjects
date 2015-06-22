This plugin incorporates OCLC's <a href="http://experimental.worldcat.org/fast/assignfast/">assignFAST application</a> into the New Subject interface to allow users to dynamically look up and add FAST subject headings to ArchivesSpace.


![FAST Subject Selection Screen](https://cloud.githubusercontent.com/assets/6333132/8283003/5cece942-18c2-11e5-910a-5e17ed401f22.png)

After the user selects the desired FAST heading, it's converted to MARCBreaker format:

![MARCBreaker Format](https://cloud.githubusercontent.com/assets/6333132/8283004/5f1f234c-18c2-11e5-90c9-354639c47b3d.png
)

Which  is then parsed via JavaScript into the appropriate fields on the web form:

![Final Screen View](https://cloud.githubusercontent.com/assets/6333132/8282946/0aa76158-18c2-11e5-857a-69c78e4a6801.png)
