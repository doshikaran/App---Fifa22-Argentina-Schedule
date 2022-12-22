import { Alert, Image, ScrollView, Text, View } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import SocialMediaButtons from "../../components/SocialMediaButtons";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSignInEmailPassword } from "@nhost/react";

const Regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignInScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const onForgotPasswordPressed = () => {};

  const { signInEmailPassword, isLoading } = useSignInEmailPassword();
  const onSignInPressed = async (data: { email: any; password: any }) => {
    if (isLoading) {
      return;
    }
    const { email, password } = data;
    const {error, needsEmailVerification} = await signInEmailPassword(email, password);
    if(error) {
      Alert.alert(error.message)
    }
    if(needsEmailVerification) {
      Alert.alert("Verify your email", "check your email")
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white", minHeight: "100%" }}
    >
      <Image
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAABNVBMVEX//////v////308/T/+/yIACaFAB2KACqJAC79///b2djp5OOIACPm4uDY1tR4eHzu6umDABiOEzf06u2CgoR9AACHACOLiYqSID+ZLkqKCTLexMm8urqurKzS0M7h3dy2fYrMysmzsbGoZHSIh4iYlpdvcHObmpynpaa9jpdgYmS/vLzIn6jn1douMTXPysvPq7O8iJOzdIBmZ2qpd4DHtLa/oKXq2d2AAAudPlbFmaPVt72hSl6tanghIyZERklTV1kVGiBISk2he4N5FTGVXmpxAAqqlZm2kpmbCTieACicH0OoBTy1YnSmEkC5a3usMVG6q66vTGOTN06ZTV6dbHafNlGLAAyTU2F6IjmKQlNwM0OLfYCEZm1uJjlvAyhpR08WAABVMzw8AAhxX2RdTFGdhYtbJCQrAAASbklEQVR4nO2di5uiVpbAr/IsFAR8g4KglFpoRLt8W5PeJD2pPDoznTI92Wyym53dnf//T9hzLmhRVckm860tRjzf110iF+T+PM97L0jIRXbCJH0BpyQXGDG5wIjJBUZMLjBicoERkwuMmFxgxOQCIyYXGDG5wIjJBUZMLjBicoERkwuMmFxgxOQCIyanAiObzRKSSVYSh5FFkf1uz7dslU2WR6IwMoyqqiyj9Dqlru83Go6iJqoeCcJgZcWycqAVzV7TbfSqnWq3YUkyg/aSDJHkYDCWZdks0/C8KohXKniuokg5NsuokqUmQiMxGKwsg03YQKIDUiqVugq8w7KMCgrju1ISNJKCwaoMyzAOqkWnGgKpWizDqmoux9iO6+YSoJEQDFsBY5Cc0EIi6fV8gCGrhLUdv+Ewx6eRCIysI6mW4zg9UAyv2+u5jtVoghNtuL6VlTolV3J830oJDN9SoLeOS/Wh2ZAa1x/96aOPb0rdpiMVPn79+qYApJzjO9EkYEBHIavwG6AYXdAK6fW//Omjjz76GOSTm48/eX3z6voaaVjssWkkAMMGDmARDbcLeuFaFpJAGK9RbkBeXRcKBWc0ks8fBossPv3MbTS7Xhe8xZ9AIT4BCq9u4B9IRMOzHCt7ZBrHh2H5IG/+/Hmj1wUfIaNC3KAqFEqeBwZyDTioajQt59iqcXQYDLLwG+8aAKPXyBU64EKb3cJ1AfIuz61eUxyvEI5jWeyZw5B89J/gQV0IqYojRW/L3evrUtVreCENYFPoHl01jg0jC1Hivi7onyIMH2v2neS6hRIYjlcoIA9QFIgoVvasYaiONf5ieffOaDd6zSceEgyoVAXT6RQQB8LoWUdOQ48NQ3JGX06//eqrL/KfN12VxL95kvE7XrfbAwwAA32I49jnDCNrWbOvv36r9Ddvb10/m80+vZZmB2BUSwUaXErXvnPcnPzIMBiA8c1fvlXGE4DhkKcwMsSCnLTb7ZQiGE3HOWoWemQYqmVZX06/+eav33z9zpVewGCaVVSNkEbhuusc12kcH4Yy+PLryeDLlt/IPYeRyfroNLwdjOp5w5ABhjR9+9dvZ5BpqNnnMIgDLHpe5DUKpSOXrkeGYVuKoki2pFiQeTEvYSgQW3vdVMFQRooFNH4JRrPbTJVmSNKDMVJ+FUZ6zERGzbBvtxKqxu+Bcd4ONPIZCEN9EU2IBTC6u2hS6Jw3DAytYCcKhSG/hOH0ul1vn2d4jnPU8Z3jZ6AII9QM5bdg9M4+HX+E8TIdZ/2uF4Ph4nDH+cLIKph17WiwL9JxH4qT6h5Gw8mdMwyIrSEMpOE8LeHhYnI4lVKtlqK61YeAc84w1B0MpCE9hyE1EUYnguE5VvasYWQUZacZYCjPzcTphjBCK2k6NjlrGESOYEiYdz3NL8F/UiuJNINayXnDUPcwJLSTJ9eiUpfRiWBQKzlvGBkKw7Zt6jWeJJhQs8ZYFFyalZ01DJKjKCIaTyZGsugydjBKJcdizl0zsuwOBq1QnlyK79FFPAijVOphsDlzGBki2zsYoBsxF0rsJnWfnbhinDsMxo7TiHUWrKQawcD1blL2/GFAnmnbMgq1lL1qENWnqyBDFiVHYVIBg5Hl3CON/ZUoTbreDWCUSp2uJGfTAANUQ8490ogCCmEdKNHQZ4BidDqOnIbVfvQzcznkgURANcJeE7nhIQxUjE61K+eOOwGfGAxwDzk1RwV0Q4oml62eh4qBHqNaBcU49hqmxGCwuYgGVQ30oeA+uzvFqIJiqAkoRkIwUDX2ukHDa9ZyqZVQI/GcHJsaGJnMXjWQBiTlkH12qx06lFGqej1VfT46es4wiCqrqgzqoYKlSFCvSa7XCRWj6nUV9fmA4FnDyOCK+VBQNSTW6VVLVDEgkrjqyynps4YBmZeKjoPCkBSp4YFKhCx6ErJIE4xMVo3RUBQ3UgxwGA2VISmDgZlXCEPN4RKFUDHwjgubKkaqYIBq2DGvgYVJp9Txuk1fZdIHA1WDUfdeQ4FQAvGk15QxlKQNRiYTCygAw+9QFk6kGCmDQdjIZ0QBpQsOo+nKocdIG4wwvFJBGJZVBRZ7xUgdjH3mFXqNRs915R2LdMEgLAM+VGX2MCzJbTiR90wZDMJIMtmF11yOzhsoDZshaYQB5YnDENWWY15DsfZGkjIYRHWUDN4Rj9JXZZx7VbMphZEhtgp2EnqN4NaS78FSUgsjA1tZm6EuQxVvp+PRD9+rJK0w0FSuw2iSk83Z7eh2+ml6YZCs+8plw2jS39a3s9lMTmk0QcUo3bzGpDyn9oOgzo2/U5y0agZh/evXrxsMjpQP9dlM4G+nb+5JSmEw3qubm2uqGut+0B/fTqfl73Y+NGUwMlLh5ubVjYXRRA7a6m1flrdv5FTCIIxbwCcBdNVwEkVWp7Pp9OFNlJGnDIbqXdPHI9h0FlqW7UV5tpk9bNMIg1U6yKJUcG2bzsnnNtPKrDz7bE1SB4MwDVyWUuoUOjbSsO2cLd/dbo3ZbQphqL1SB5dwFa4txVbr27erQJ5WpuV3s1za5k3ASryOFy7IaCrS+r2qtreyXN+O7qfbtMEgjONVu13PK5UKnqVM+fk4WKu2MpvO3pXNF/conTkM1cXnlXk4j1ZQLHnzRas1ac1kqXJ7r7fTBkPueb1mL7wJazSSpq2VGZjmWL7Nt8b3z2/LOXMYrNLrNl28iRXchj9SZDX3Bf+35VgZae3ZtJ8qGOAyej0XYeBqx8ZIsXNv3wdDZT2VFWusvEtg4WOSMBq9pus2m/TeI9eybNnEcY1AHj8o/YE4SBUMtfkIw3MdSwoXhqpv38vjt/XpcR+2kzCMrNyjz7wEFwrx1R1B3kVpmH+zzVqwmT4ksAw0uTVdUrPp+g30GkCjQWHIgGNkysG6PRiPUwXDajbxiYegGoDDj2DQ9eTy9H7bmqZmhTCO+I3ASnxKA3CMAIZkhyvr6e1aM0tNFQzXpY88dNGLKjsYcgjDUhJ52HZiMKxGw6dPjEU3KjtgJghjKIcwnt/yet4wGAW0wqEP0PV9C2GgZtgtObyPz1KSyLoS0wwbWIwsS6KPTqbPTpBzajBJI4wMKzsjB6xBthXLxqdqSPbo2/Xbv4Sz8YoiHfm5qInCyOQU9JqKrapQolnTqWIHZv2LbzdjurzLslNVqKkyVGSSbassw0jTz27vZTMQvhKCFcAAlUni6fwJFmpqTsVxYJyEl76/nz6A+9Ty22AqKSPHsVJVtWYyACFcjqDa09Gb+5m83ebAWHB5rO88f7LGmcMgDKWBk2nSd/96P5XVcd80ZpIiQR7m26ka3IG6NdILMBb1h3dv5Nttux1MR/f3Taha0nUnEn50NlpHn5M/f/fd9M/6w1ZWfpj+m9frycn8DlCis/BsloVYoqr+jz/9++g/OG1qWd93f/Y8JREUSa/pAmtgGfnn/7z5+88/zdbTdz/948f/uq4mMsqVPAwwlSwjq42bT/4OyvHTf//4Px8X/KukWCQNI0MXQBJyNfL/4XnVrs/8YpsjSfIwMhGP32hzDDkJGChXV1egIFcXGPRCfkebDy0nA+MU5AIjJhcYMbnAiMkFRkwuMGJygRGTJB5aFiLZPX4n4vOIak/sJbz9ofv/D8r3cDDYSKAWZdnHTfwNa5LZN4GX2AbepP8TZj4Pf+U6ahvuD/vHhi0fx00JO58X6aH78+yOOi0YxTKPopWzd4vFlhBBo9tlk0wWfHlI2yy0MiHDMr+YELIqw67hElppmzkhQXj4JkeIDueg3zl9i1uuIjZkvsVzVgZmeTGGs90tykMT2mjcZn0YGoeDUdF1keP4OzIRjTYhNbqZFwnh4FWLtmkb+SIJBF1fQlcEnpgLgxNFQVwM8V2xkod/LKnrGkth5HUdYIiCUKRWESwMoVLjFqshJ/bhbC2RG5ocHMIZ2mFWPR0ShjgYmmZxD0OcwOacrDnd0AXaZiBwJhmLdZ0npC4siajnA9ARzqgDDCEgxaWeHz7CALwsYy4N2A1WUdR0rg8mMQQCMRjiigAR4+RgcKEx7GGs6GbbMFYiQACBr3RAttxKzOeIJvSHFWNDslfQe35OYUD/tPkTGHiUofNDgNESUb/QhzyBIcCnREecFAxxHATQ6YkRwjDaQRAQRjPaRR7eyYL/440JEfJzUTCLfN4MBOR1BboirNeCcRe0BGFLnsKAv7A7AAhLvTIPo81zGKAZ+slphi4K6Cl3MHRD0Fah/oPxMwCDLI0ly/NkI6xMji+usJcgKwpDF3hRBM/6AsZKoDBqep75BRi6mM8bWnB6MGr6A1z1HoZeA9e3xD70o26PRXHI1chYuBsIOrgQ6FQGDYADLTHu+iLYy0sYsBuiBdno3C9phi5q/HJ9mOB6aJ+ReYRBfUaR1/XJZKvrG2wExtAS2vCnPhHuyJDX6/iurmtFqkBrQRxTGOEpQ5/BcLAbYPSpK0IZcvTVxuCLEZcDJRoHhpF9DmOF6s9jkCyGaGpw9cMKKA2oSt0QWsXinShuQmsiEF8RBjcEKQKM2nwY6Dpwwwut6EJ7yBZNMwNxxWQhSlUI9RkHm307HAxer5ihZogiwjAE/M7gz2q9Xm8MvGgCwVQHnWdBXSCGXs0rosjnIdFQScBxAQYiOEfd0CuVCuRV2CrPifw2zL6HnCBWeB52DDQgLBiLNTHzQv8E0/GiXq+FZtKq1+/AV9broBlDeBf3BrX6EmHc1WoiuIWHWs3IQhxhWgbP62O4BlAAgGHqtQlZ1lD0FTHgT30zHu6qF3ZVhwy0NoB2yzxf2Zh4ALQ7ORi7Ad3Mk6HdJ8O82Sx5tomD4bS0eLbr+bl314rPs4eWV9j68bCDsTgcjH/iI/dH/PMHEwo4s6t5DywfAMb/AQgL2N9zUb+2QX6lzYHk8DAIE0zetvvDlzAImf/2POqTE8Y3fu31AeXgMMDVcyACvyw+n2Qutsu/zYIZP2ApT4tywg6WULdu17RQozu2JvrodVvktdr40D/ze2gYZMzr+e24DZWKyMa/ReiZINafcHvcGxu8mmh5jjMMbQxHQBEjChBQ8w9wlW2tUsEdELDn5XyFgwTGOPAyuAPDIHNIAbB4LULZ3go7OR8O50WWsJCJLB+HsSISRdypYlBh8AcuGMK1AnO9FfVFkdZ+y8Ac1AygyPKtNd0B6eh4M1ibmM6NTxvGRBQGBCeRA5pNkuIdHfFaTIgG2bXO89o2FipXOp/P5/kyfO+LcpGsykF0uqUBuVkrSsAzNcjUouD7YFTWNKwS/ITlacPAsQkKA/QA6q05L/ICpJ2gJWUBYEBmuR+Uguqikq+IiIhWXfO1xvUjBznG4kzU80V6cihp2uFzJKBdJarKUHGWh/Whh4YBhWeOwoCUWwM24kMRv0OAYZqC/n5omsyukiCDPHaMrSAM6L1Z499HpEjb0OZwBg6MrFYkuTx0O4SxNbTIMROzQkd7ThhGHWuPUDOMJSgGGg3ZiACDMOgzSMzXQhECO9cCwoCatLUwo71Qz0Jtm+F1gbBlUSDFHQxi8rRqwzZgSlrxtGGMRb1GF50EnLYGlRABRlFDMyHUgcY+mdWg6RUoQQhDN/rRiaDLlWUGy1eeJWscROdAB0IWlU14uxbJbDnNJKcNAzoubjBM6PyEkIGIww2D98YvwYDvG1wsY9QjGDz1i3Bsv6xRLisBR0hYHEjmTSzzxmV+RcJphLm+2BTJgbPyg+cZAdDQTbJdrOBbHwgGFLCVNReZSS1+CGxD/ydBLTKTbfj2vC6uwnDB4jAggq2LODQ0rBmriFemVW4Pn37wKcLADFTXOX3Loq2YnC6st+NhHnMOcK7inRkTCL7jAU/0EAboEBSxTItvmUO6G7qvQWgCvrzIEGZS2e9Yi5t1+PKwd7J9gNpkWIMgKrYxKoJb0PM6DsEgjBWvQ0L5KBBUcQQ5giGsEUaLx8kkEG0DmyYvzsFrQEAhd3kc+sUd7WIZDqRnKM9PHEYGbRy+dG2CQXXBLxlilstU3wc1/qloNfj+NZx0HC/KazzPqqyFUl6hahXvykKZOpBxOTqmHGR3LzXuxM2E0mD7ebAJvo8/cRPuD93e4wMuI4EDr/BPhm48bUIjNGHnJKxdYqePHX9IFh9ocAf6MOYhPgyifSQatH3OAt+l+3YPo3rC6+m5Yx+1f/mHgEFLsJYG9dVxfxXu/ykfbtgPi7TyBcb+3GQeuoU/inzYAeE/DgcqCYyOn65cYMTkAiMmFxgxucCIyQVGTC4wYnKBEZMLjJhcYMTkAiMmFxgxucCIyQVGTC4wYnKBEZMLjJgQ5n8ByvdmRsA+lmAAAAAASUVORK5CYII=",
        }}
        resizeMode="cover"
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      />

      <View style={{ padding: 25 }}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: Regex, message: "Email is invalid" },
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum characters should be 8",
            },
          }}
        />

        <CustomButton
          text={isLoading ? "Wait" : "Sign In"}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot Password"
          type="TERTIARY"
          onPress={onForgotPasswordPressed}
        />
        <SocialMediaButtons />
        <CustomButton
          text="Create an Account"
          onPress={() => navigation.navigate("SignUp")}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
