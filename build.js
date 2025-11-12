import StyleDictionary from 'style-dictionary';
import { expandTypesMap, register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});
StyleDictionary.registerTransform({
  name: "assets/background",
  type: "value",
  filter: (token) => token.$type === "asset",
  transform: (token) => `url("/app/assets/${token.$value}")`,
})

const loader = ThemesLoader(StyleDictionary);

async function run() {

const themes = await loader.load("/tokens")
const globalTheme = themes.getThemeByName("global")
const lightTheme = themes.getThemeByName("light")
const darkTheme = themes.getThemeByName("dark")
const mobileTheme = themes.getThemeByName ("mobile")
const desktopTheme = themes.getThemeByName ("desktop");

const globalConfig = {
  log: {
    verbosity: 'verbose'

  },
  expand: {
    typesMap: true
  },
  platforms: {
    web: {
      files: [
        {
          format:"css/variables", 
          destination: "app/build/global/variables.css"
        }
      ],
      transforms: [
        "name/kebab",
        "ts/resolveMath",
        "size/pxToRem",
        "ts/typography/fontWeight",
        "ts/size/lineheight"

      ]
    }
  }
}

const desktopConfig = {
  log: {
    verbosity: 'verbose'

  },
  expand: {
    typesMap: true
  },
  platforms: {
    web: {
      files: [
        {
          format:"css/variables", 
          destination: "app/build/desktop/variables.css"
        }
      ],
      transforms: [
        "name/kebab",
        "ts/resolveMath",
        "size/pxToRem",
        "ts/typography/fontWeight",
        "ts/size/lineheight"

      ]
    }
  }
}
const mobileConfig = {
  log: {
    verbosity: 'verbose'

  },
  expand: {
    typesMap: true
  },
  platforms: {
    web: {
      files: [
        {
          format:"css/variables", 
          destination: "app/build/mobile/variables.css"
        }
      ],
      transforms: [
        "name/kebab",
        "ts/resolveMath",
        "size/pxToRem",
        "ts/typography/fontWeight",
        "ts/size/lineheight"

      ]
    }
  }
}
const androidConfig = {
expand: {
    typesMap: true
  },
  platforms: {
    web: {
      files: [
        {
          format:"android/dimens", 
          destination: "app/build/android/dimens.xml"
        }
      ],
      transforms: [
        "name/camel",
        "size/pxToRem",
        "ts/typography/fontWeight",
        "ts/size/lineheight",
      
  
      

      ]
    }
  }
  
}

const lightConfig = {
expand: {
    typesMap: true
    },

  platforms: {
    web: {
      files: [
        {
          format:"css/variables", 
          destination: "app/build/light/variables.css",
          options: {
            selector: ".light"
          }
        }
      ],
      transforms: [
        "name/kebab",
        "assets/background",

      ]
    }
  }

}
const darkConfig = {
expand: {
    typesMap: true
    },

  platforms: {
    web: {
      files: [
        {
          format:"css/variables", 
          destination: "app/build/dark/variables.css",
          options: {
            selector: ".dark"
          }
        }
      ],
      transforms: [
        "name/kebab",

      ]
    }
  }

}

globalTheme.addConfig(globalConfig).build()
lightTheme.addConfig(lightConfig).build()
darkTheme.addConfig(darkConfig).build()
desktopTheme.addConfig(desktopConfig).build()
mobileTheme.addConfig(mobileConfig).build();
//globalTheme.addConfig(androidConfig).build()

//themes.print()
}
run();
