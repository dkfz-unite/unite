import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectManyOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

export const keys = {
  event_threshold: "event_threshold",
  track_property: "track_property",
  track_value: "track_value"
}

const options = [
  // General
  new OptionsGroup("General", [
    new NumberOption({
      key: keys.event_threshold,
      title: "Event threshold",
      default: 0.8,
      min: 0,
      max: 1,
      step: 0.1
    }),

    new SelectManyOption({
      key: keys.track_property,
      title: "Track properties (optional)",
      options: [],
      lazy: SelectMethod.Once
    }),

    new SelectManyOption({
      key: keys.track_value,
      title: "Track values (optional)",
      options: [],
      lazy: SelectMethod.Once,
      show: (options: IOption[]) => options?.find(o => o.key === keys.track_property)?.value?.length == 1
    })
  ])
];

export default options;