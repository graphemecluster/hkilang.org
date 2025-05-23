// Automatically Generated by Strapi - DO NOT MODIFY

import type { Schema, Struct } from "@strapi/strapi";

export interface AboutPageAboutSection extends Struct.ComponentSchema {
	collectionName: "components_about_page_about_sections";
	info: {
		displayName: "About Section";
	};
	attributes: {
		content: Schema.Attribute.RichText & Schema.Attribute.Required;
		subtitle: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface AboutPageMember extends Struct.ComponentSchema {
	collectionName: "components_about_page_members";
	info: {
		displayName: "Member";
		icon: "user";
	};
	attributes: {
		image: Schema.Attribute.Media<"images">;
		name: Schema.Attribute.String & Schema.Attribute.Required;
		position: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface AboutPageTimelineItem extends Struct.ComponentSchema {
	collectionName: "components_about_page_timeline_items";
	info: {
		displayName: "Timeline Item";
		icon: "clock";
	};
	attributes: {
		summary: Schema.Attribute.String & Schema.Attribute.Required;
		year: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface DictionaryExample extends Struct.ComponentSchema {
	collectionName: "components_dictionary_examples";
	info: {
		description: "";
		displayName: "Example";
		icon: "book";
	};
	attributes: {
		audio: Schema.Attribute.Media<"audios">;
		glyph: Schema.Attribute.String;
		notes: Schema.Attribute.String;
		pron: Schema.Attribute.String;
	};
}

export interface DictionaryLinguisticForm extends Struct.ComponentSchema {
	collectionName: "components_dictionary_linguistic_forms";
	info: {
		description: "";
		displayName: "Linguistic Form";
		icon: "book";
	};
	attributes: {
		audio: Schema.Attribute.Media<"audios">;
		examples: Schema.Attribute.Component<"dictionary.example", true>;
		glyph: Schema.Attribute.String;
		lang: Schema.Attribute.Relation<"oneToOne", "api::language.language">;
		notes: Schema.Attribute.String;
		pron: Schema.Attribute.String;
	};
}

export interface EventHighlightsPageEvent extends Struct.ComponentSchema {
	collectionName: "components_event_highlights_page_events";
	info: {
		displayName: "Event";
		icon: "calendar";
	};
	attributes: {
		heading:
			& Schema.Attribute.Component<"shared.heading", false>
			& Schema.Attribute.Required;
		year: Schema.Attribute.Date & Schema.Attribute.Required;
	};
}

export interface FaqPageFaqSection extends Struct.ComponentSchema {
	collectionName: "components_faq_page_faq_sections";
	info: {
		displayName: "FAQ Section";
		icon: "question";
	};
	attributes: {
		answer: Schema.Attribute.RichText & Schema.Attribute.Required;
		question: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageCulturalContext extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_cultural_contexts";
	info: {
		displayName: "Cultural Context";
		icon: "";
	};
	attributes: {
		sections:
			& Schema.Attribute.Component<"shared.heading", true>
			& Schema.Attribute.Required;
		summary: Schema.Attribute.Text & Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageLanguageIntroSection extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_language_intro_sections";
	info: {
		displayName: "Language Intro Section";
		icon: "pencil";
	};
	attributes: {
		content: Schema.Attribute.RichText & Schema.Attribute.Required;
		subtitle: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageLanguageMap extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_language_maps";
	info: {
		displayName: "Language Map";
	};
	attributes: {
		heading:
			& Schema.Attribute.Component<"shared.heading", false>
			& Schema.Attribute.Required;
		villages:
			& Schema.Attribute.Component<"language-intro-page.village", true>
			& Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageRelatedResources extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_related_resources";
	info: {
		displayName: "Related Resources";
		icon: "information";
	};
	attributes: {
		heading:
			& Schema.Attribute.Component<"shared.heading", false>
			& Schema.Attribute.Required;
		resources:
			& Schema.Attribute.Component<
				"language-intro-page.resource",
				true
			>
			& Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageResource extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_resources";
	info: {
		displayName: "Resource";
		icon: "information";
	};
	attributes: {
		buttonText: Schema.Attribute.String & Schema.Attribute.Required;
		buttonUrl: Schema.Attribute.String & Schema.Attribute.Required;
		heading:
			& Schema.Attribute.Component<"shared.heading", false>
			& Schema.Attribute.Required;
	};
}

export interface LanguageIntroPageVillage extends Struct.ComponentSchema {
	collectionName: "components_language_intro_page_villages";
	info: {
		displayName: "Village";
		icon: "pinMap";
	};
	attributes: {
		name: Schema.Attribute.String & Schema.Attribute.Required;
		population: Schema.Attribute.String;
	};
}

export interface SharedHeading extends Struct.ComponentSchema {
	collectionName: "components_shared_headings";
	info: {
		displayName: "Heading";
		icon: "layout";
	};
	attributes: {
		coverImage: Schema.Attribute.Media<"images">;
		summary: Schema.Attribute.Text;
		title: Schema.Attribute.String & Schema.Attribute.Required;
	};
}

declare module "@strapi/strapi" {
	export module Public {
		export interface ComponentSchemas {
			"about-page.about-section": AboutPageAboutSection;
			"about-page.member": AboutPageMember;
			"about-page.timeline-item": AboutPageTimelineItem;
			"dictionary.example": DictionaryExample;
			"dictionary.linguistic-form": DictionaryLinguisticForm;
			"event-highlights-page.event": EventHighlightsPageEvent;
			"faq-page.faq-section": FaqPageFaqSection;
			"language-intro-page.cultural-context": LanguageIntroPageCulturalContext;
			"language-intro-page.language-intro-section": LanguageIntroPageLanguageIntroSection;
			"language-intro-page.language-map": LanguageIntroPageLanguageMap;
			"language-intro-page.related-resources": LanguageIntroPageRelatedResources;
			"language-intro-page.resource": LanguageIntroPageResource;
			"language-intro-page.village": LanguageIntroPageVillage;
			"shared.heading": SharedHeading;
		}
	}
}
