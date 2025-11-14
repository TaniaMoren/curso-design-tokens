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

StyleDictionary.registerTransform({
  name: "fontFamily/css",
  type: "value",
  transitive: true,
  filter: (token) => token.$type === "fontFamilies" || token.type === "fontFamily",
  transform: (token) => {
    const value = token.$value || token.value;
    // Si el valor contiene espacios, lo envolvemos en comillas
    if (typeof value === 'string' && value.includes(' ')) {
      return `"${value}"`;
    }
    return value;
  }
})

StyleDictionary.registerFormat({
  name: 'json/nested-values',
  format: ({ dictionary }) => {
    const buildNestedObj = (obj, keys, value) => {
      const key = keys.shift();
      if (keys.length === 0) {
        obj[key] = value;
      } else {
        obj[key] = obj[key] || {};
        buildNestedObj(obj[key], keys, value);
      }
      return obj;
    };

    const output = {};
    dictionary.allTokens.forEach(token => {
      // Use $value if available, otherwise fall back to value
      const tokenValue = token.$value !== undefined ? token.$value : token.value;
      buildNestedObj(output, [...token.path], tokenValue);
    });

    return JSON.stringify(output, null, 2);
  }
})

const loader = ThemesLoader(StyleDictionary);

async function run() {

const themes = await loader.load("/tokens")
const globalTheme = themes.getThemeByName("global")
const lightTheme = themes.getThemeByName("light")
const darkTheme = themes.getThemeByName("dark")
const mobileTheme = themes.getThemeByName ("mobile")
const desktopTheme = themes.getThemeByName ("desktop");
const esTheme = themes.getThemeByName("es");
const enTheme = themes.getThemeByName("en");

const globalConfig = {
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
        "ts/size/lineheight",
        "fontFamily/css"

      ]
    }
  }
}

const desktopConfig = {
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
        "ts/size/lineheight",
        "fontFamily/css"

      ]
    }
  }
}
const mobileConfig = {
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
        "ts/size/lineheight",
        "fontFamily/css"

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

const esConfig = {
  platforms: {
    web: {
      files: [
        {
          format: "json/nested-values",
          destination: "app/build/copies/es.json"
        }
      ],
      transforms: []
    }
  }
}

const enConfig = {
  platforms: {
    web: {
      files: [
        {
          format: "json/nested-values",
          destination: "app/build/copies/en.json"
        }
      ],
      transforms: []
    }
  }
}

globalTheme.addConfig(globalConfig).build()
lightTheme.addConfig(lightConfig).build()
darkTheme.addConfig(darkConfig).build()
desktopTheme.addConfig(desktopConfig).build()
mobileTheme.addConfig(mobileConfig).build();
esTheme.addConfig(esConfig).build();
enTheme.addConfig(enConfig).build();
//globalTheme.addConfig(androidConfig).build()

//themes.print()
}
run();
