import StyleDictionary from 'style-dictionary';
import { expandTypesMap, register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {

const themes = await loader.load("/tokens")
const globalTheme = themes.getThemeByName("global")
const lightTheme = themes.getThemeByName("light");

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
          destination: "app/build/light/variables.css"
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
//globalTheme.addConfig(androidConfig).build()

//themes.print()
}
run();
